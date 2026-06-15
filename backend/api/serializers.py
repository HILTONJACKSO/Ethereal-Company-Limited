from rest_framework import serializers
from .models import (
    User, TeamMember, Service, Project, ProjectGallery, 
    BlogCategory, BlogPost, Testimonial, Partner, 
    ContactMessage, NewsletterSubscriber, CareerOpenings
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']
        read_only_fields = ['id']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ProjectGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectGallery
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    gallery = ProjectGallerySerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'client', 'location', 
            'status', 'project_date', 'description', 'scope', 
            'challenges', 'solutions', 'results', 'cover_image', 
            'cover_image_url', 'is_featured', 'gallery'
        ]

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    category_detail = BlogCategorySerializer(source='category', read_only=True)
    author_detail = UserSerializer(source='author', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_detail', 'author', 
            'author_detail', 'status', 'tags', 'content', 'featured_image', 
            'featured_image_url', 'seo_title', 'seo_description', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'is_read']

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

class CareerOpeningsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerOpenings
        fields = '__all__'
