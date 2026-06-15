import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import User

def create_admin():
    username = "admin"
    email = "etherealcompanylimited@gmail.com"
    password = "Password@pos1"

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
            first_name="Ethereal",
            last_name="Admin",
            role="admin"
        )
        print("Superuser created successfully.")
    else:
        print("Superuser already exists.")

if __name__ == "__main__":
    create_admin()
