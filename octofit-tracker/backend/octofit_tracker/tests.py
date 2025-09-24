from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Team, Activity, Workout, Leaderboard

class APIRootTest(APITestCase):
    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('workouts', response.data)
        self.assertIn('leaderboards', response.data)

class UserTests(APITestCase):
    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamTests(APITestCase):
    def test_list_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ActivityTests(APITestCase):
    def test_list_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class WorkoutTests(APITestCase):
    def test_list_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class LeaderboardTests(APITestCase):
    def test_list_leaderboards(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
