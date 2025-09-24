"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import RedirectView
from . import views
import os

# Get Codespace environment variables
CODESPACE_NAME = os.environ.get('CODESPACE_NAME', None)
CODESPACE_URL = f"https://{CODESPACE_NAME}-8000.app.github.dev" if CODESPACE_NAME else None

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')
router.register(r'leaderboards', views.LeaderboardViewSet, basename='leaderboard')

# Configure router with proper schema
if CODESPACE_URL:
    router.schema_title = 'Octofit API'
    router.root_renderers = None  # Disable default API root view
    # Override the default URL scheme
    router.default_schema_renderers = ['rest_framework.renderers.JSONRenderer']
    router.root_view_name = 'api-root'

# The API URLs are determined by the router
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    path('api/', views.api_root, name='api-root'),
    path('api/', include(router.urls)),
]
