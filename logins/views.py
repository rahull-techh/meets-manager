from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
import secrets

from .models import EmailOTP


def home(request):
    return JsonResponse({
        "message": "Welcome to the home page",
        "user": str(request.user),
        "authenticated": request.user.is_authenticated
    })


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

    # TODO: Send OTP through email

    return JsonResponse({
        "message": "Registration successful. OTP sent to your email.",
        "email": email
    }, status=201)


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

    if user is not None:

        # User must verify email first
        if not user.is_active:
            return JsonResponse({
                "error": "Please verify your email before logging in"
            }, status=403)

        login(request, user)

        return JsonResponse({
            "message": "Login successful",
            "username": user.username
        }, status=200)

    return JsonResponse({
        "error": "Invalid username or password"
    }, status=401)


def logout_user(request):

    logout(request)

    return JsonResponse({
        "message": "Logout successful"
    }, status=200)


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
        otp_record = EmailOTP.objects.get(
            user=user,
            is_verified=False
        )

    except (User.DoesNotExist, EmailOTP.DoesNotExist):
        return JsonResponse({
            "error": "Invalid verification request"
        }, status=400)

    if timezone.now() > otp_record.created_at + timedelta(minutes=10):

        return JsonResponse({
            "error": "OTP expired"
        }, status=400)

    if otp_record.otp != otp:

        return JsonResponse({
            "error": "Invalid OTP"
        }, status=400)

    
    user.is_active = True
    user.save()

    otp_record.is_verified = True
    otp_record.save()

    return JsonResponse({
        "message": "Email verified successfully. You can now login."
    }, status=200)