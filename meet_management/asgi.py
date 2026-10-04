"""
ASGI config for meet_management project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.1/howto/deployment/asgi/
"""

"""
ASGI config for meet_management project.
"""

import os

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "meet_management.settings"
)

from django.core.asgi import get_asgi_application

django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter

from meetings.routing import websocket_urlpatterns
from meetings.middleware import JWTAuthMiddleware


application = ProtocolTypeRouter({

    "http": django_asgi_app,

    "websocket": JWTAuthMiddleware(
        URLRouter(
            websocket_urlpatterns
        )
    ),

})