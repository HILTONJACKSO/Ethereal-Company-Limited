from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, TeamMember, Service, Project, ProjectGallery,
    BlogCategory, BlogPost, Testimonial, Partner,
    ContactMessage, NewsletterSubscriber, CareerOpenings
)

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),
    )

class ProjectGalleryInline(admin.TabularInline):
    model = ProjectGallery
    extra = 3

class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'project_date', 'is_featured']
    list_filter = ['category', 'status', 'is_featured']
    search_fields = ['title', 'description', 'location', 'client']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectGalleryInline]

class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {'slug': ('title',)}

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'content', 'tags']
    prepopulated_fields = {'slug': ('title',)}

class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'order']
    list_editable = ['order']
    search_fields = ['name', 'role']

class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']
    search_fields = ['name']

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']

admin.site.register(User, CustomUserAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(BlogCategory)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Testimonial)
admin.site.register(Partner, PartnerAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)
admin.site.register(NewsletterSubscriber)
admin.site.register(CareerOpenings)
