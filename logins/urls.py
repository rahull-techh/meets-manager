from . import views
from django.urls import path, include

urlpatterns = [

    path('', views.home, name="home"),
    path('register/', views.register, name="register"),
    path('login/', views.LoginAPIView.as_view(), name="login"),
    path('logout/', views.logout_user, name="logout"),
    path('verifyotp/', views.verify_otp, name="verifyotp"),

]