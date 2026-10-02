from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer

from datetime import timedelta
import secrets

from .models import EmailOTP


def home(request):

    return JsonResponse({
        "message": "Welcome to the home page",
        "user": str(request.user),
        "authenticated": request.user.is_authenticated
    })


@csrf_exempt
def register(request):

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    username = request.POST.get("username")
    email = request.POST.get("email")
    password = request.POST.get("password")

    if not username or not email or not password:
        return JsonResponse({
            "error": "All fields are required"
        }, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({
            "error": "Enter a valid email address"
        }, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({
            "error": "Username already registered"
        }, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({
            "error": "Email already registered"
        }, status=400)

    hashed_password = make_password(password)

    user = User.objects.create(
        username=username,
        email=email,
        password=hashed_password,
        is_active=False
    )

    otp = str(secrets.randbelow(900000) + 100000)

    EmailOTP.objects.create(
        user=user,
        otp=otp
    )

    try:

        send_mail(
            subject="Meet Manager - Email Verification OTP",
            message=(
                f"Hello {username},\n\n"
                f"Your OTP for Meet Manager is: {otp}\n\n"
                f"This OTP is valid for 10 minutes.\n\n"
                f"If you did not request this, please ignore this email."
            ),
            from_email=None,
            recipient_list=[email],
            fail_silently=False
        )

    except Exception as e:

        # If email sending fails, remove the user and OTP
        # so that the database doesn't contain an unusable account.
        EmailOTP.objects.filter(user=user).delete()
        user.delete()

        return JsonResponse({
            "error": "Could not send OTP email",
            "details": str(e)
        }, status=500)

    return JsonResponse({
        "message": "Registration successful. OTP sent to your email.",
        "email": email
    }, status=201)


@csrf_exempt
def verify_otp(request):

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    email = request.POST.get("email")
    otp = request.POST.get("otp")

    if not email or not otp:
        return JsonResponse({
            "error": "Email and OTP are required"
        }, status=400)

    try:
        user = User.objects.get(email=email)
        otp_record = EmailOTP.objects.get(user=user)

    except User.DoesNotExist:
        return JsonResponse({
            "error": "Invalid verification request"
        }, status=400)

    except EmailOTP.DoesNotExist:
        return JsonResponse({
            "error": "OTP not found or already used"
        }, status=400)

    # OTP expires after 10 minutes
    if timezone.now() > otp_record.created_at + timedelta(minutes=10):

        otp_record.delete()

        return JsonResponse({
            "error": "OTP expired. Please register again."
        }, status=400)

    # Compare entered OTP with stored OTP
    if otp_record.otp != otp:

        return JsonResponse({
            "error": "Invalid OTP"
        }, status=400)

    # OTP is correct
    user.is_active = True
    user.save()

    # OTP can only be used once
    otp_record.delete()

    return JsonResponse({
        "message": "Email verified successfully. You can now login."
    }, status=200)


@csrf_exempt
def login_user(request):

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    username = request.POST.get("username")
    password = request.POST.get("password")

    if not username or not password:
        return JsonResponse({
            "error": "Username and password are required"
        }, status=400)

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None:
        return JsonResponse({
            "error": "Invalid username or password"
        }, status=401)

    if not user.is_active:
        return JsonResponse({
            "error": "Please verify your email before logging in"
        }, status=403)

    login(request, user)

    return JsonResponse({
        "message": "Login successful",
        "username": user.username
    }, status=200)


class LoginAPIView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "Login successful",

                "refresh": str(refresh),

                "access": str(refresh.access_token),

                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
@csrf_exempt
def logout_user(request):

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    logout(request)

    return JsonResponse({
        "message": "Logout successful"
    }, status=200)