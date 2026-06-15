from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

class User(AbstractUser):
    role_choices = [
        ('admin', 'Super Admin'),
        ('editor', 'Editor'),
    ]
    role = models.CharField(max_length=20, choices=role_choices, default='admin')
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Alternative external image link")
    bio = models.TextField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    icon = models.CharField(max_length=50, help_text="React icon class, e.g. FaBuilding or GiCrane")
    short_description = models.TextField()
    detail = models.TextField(help_text="Detailed description of the service (Markdown supported)")
    benefits = models.JSONField(default=list, help_text="A list of bullet points showing benefits", blank=True)
    process_flow = models.JSONField(default=list, help_text="Steps involved in the project workflow", blank=True)
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Alternative external image link")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Project(models.Model):
    category_choices = [
        ('Road Construction', 'Road Construction'),
        ('Mining Operations', 'Mining Operations'),
        ('Logistics & Haulage', 'Logistics & Haulage'),
        ('Civil Engineering', 'Civil Engineering'),
        ('Infrastructure Development', 'Infrastructure Development'),
    ]
    status_choices = [
        ('Planning', 'Planning'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    category = models.CharField(max_length=100, choices=category_choices)
    client = models.CharField(max_length=150)
    location = models.CharField(max_length=150, help_text="e.g. Monrovia, Liberia or Freetown, Sierra Leone")
    status = models.CharField(max_length=20, choices=status_choices, default='Completed')
    project_date = models.DateField()
    description = models.TextField()
    scope = models.TextField(help_text="List or paragraph explaining the project scope")
    challenges = models.TextField(blank=True, null=True)
    solutions = models.TextField(blank=True, null=True)
    results = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    cover_image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Alternative external cover image link")
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-project_date']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ProjectGallery(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='projects/gallery/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    is_video = models.BooleanField(default=False)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    caption = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"Media for {self.project.title}"

class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    status_choices = [
        ('Draft', 'Draft'),
        ('Published', 'Published'),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.PROTECT, related_name='posts')
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='blog_posts')
    status = models.CharField(max_length=20, choices=status_choices, default='Published')
    tags = models.CharField(max_length=200, help_text="Comma separated tags", blank=True)
    content = models.TextField(help_text="Blog post body content (HTML or Markdown supported)")
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    featured_image_url = models.URLField(max_length=500, blank=True, null=True)
    seo_title = models.CharField(max_length=200, blank=True, null=True)
    seo_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    company = models.CharField(max_length=150)
    designation = models.CharField(max_length=100, blank=True, null=True)
    feedback = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.client_name} ({self.company})"

class Partner(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    logo_url = models.URLField(max_length=500, blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    impact = models.TextField(blank=True, null=True, help_text="Describe collaboration projects or impact")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class CareerOpenings(models.Model):
    job_title = models.CharField(max_length=150)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.JSONField(default=list, help_text="List of job requirements")
    application_deadline = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Career Openings"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.job_title} - {self.location}"
