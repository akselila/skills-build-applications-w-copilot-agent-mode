from rest_framework import serializers
from bson import ObjectId
from .models import User, Team, Activity, Workout, Leaderboard

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return ObjectId(data)

class TeamSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = Team
        fields = ['_id', 'name', 'description']

class UserSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    team = ObjectIdField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['_id', 'email', 'name', 'team']

class ActivitySerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    user = ObjectIdField()

    class Meta:
        model = Activity
        fields = ['_id', 'user', 'type', 'duration', 'date']

class WorkoutSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'suggested_for']

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    team = ObjectIdField()

    class Meta:
        model = Leaderboard
        fields = ['_id', 'team', 'points']
