from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.home, name="home"),
    path('register/', views.register, name="register"),
    path('login/', views.LoginAPIView.as_view(), name="login"),
    path('logout/', views.logout_user, name="logout"),
    path('verifyotp/', views.verify_otp, name="verifyotp"),
    path('profile/', views.ProfileAPIView.as_view(), name="profile"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]