from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserViewSet, TeamMemberViewSet, ServiceViewSet, ProjectViewSet,
    ProjectGalleryViewSet, BlogCategoryViewSet, BlogPostViewSet,
    TestimonialViewSet, PartnerViewSet, ContactMessageViewSet,
    NewsletterSubscriberViewSet, CareerOpeningsViewSet
)

# Swagger documentation schema configuration
schema_view = get_schema_view(
   openapi.Info(
      title="Ethereal Company Limited API",
      default_version='v1',
      description="API documentation for Ethereal Company Limited services, projects, blog, partners, and user management.",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="etherealcompanylimited@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'team', TeamMemberViewSet, basename='teammember')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'project-gallery', ProjectGalleryViewSet, basename='projectgallery')
router.register(r'blog-categories', BlogCategoryViewSet, basename='blogcategory')
router.register(r'blog-posts', BlogPostViewSet, basename='blogpost')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'partners', PartnerViewSet, basename='partner')
router.register(r'contact', ContactMessageViewSet, basename='contactmessage')
router.register(r'newsletter', NewsletterSubscriberViewSet, basename='newsletter')
router.register(r'careers', CareerOpeningsViewSet, basename='careers')

urlpatterns = [
    # JWT authentication routes
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Standard router endpoints
    path('', include(router.urls)),
    
    # Swagger & Redoc documentation paths
    path('docs/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
