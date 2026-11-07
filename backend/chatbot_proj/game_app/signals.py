from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Theme, Monster, Location

themes = {
    "Fantasy": { "location": "Montopia", "goal": 'sell a sword'},
    "Sci-Fi": { "location": "Psy-Cy", "goal": 'sell a fan'},
    "Modern": { "location": "Citnilla", "goal": 'sell a pen'}
}

monsters = {
    "Fantasy": {"name": "Dorcagon", "description": 'Dorcagon is a dragon perched up on their mound of gold and magical items.'},
    "Sci-Fi": {"name": "Buzzerk", "description": 'Buzzerk is a cyborg running a post apocalyptic black-market operation for electronic body parts'},
    "Modern": {"name": "Brandon", "description": "Brandon is a modern master of the calculator, a stock trader and ruthless negotiator that respects a creative approach."}
}

@receiver(post_migrate)
def populate_data(sender, **kwargs):
    if sender.name == 'game_app':  # Replace with your actual app name
        
        # Populate Theme and Location data
        for theme_name, theme_data in themes.items():
            theme, created = Theme.objects.get_or_create(name=theme_name)
            Location.objects.get_or_create(
                name=theme_data['location'],
                goal=theme_data['goal'],
                theme=theme
            )

        # Populate Monster data
        for theme_name, monster_data in monsters.items():
            # Ensure that the theme exists
            try:
                theme = Theme.objects.get(name=theme_name)  # Use the key directly
            except Theme.DoesNotExist:
                print(f"Theme '{theme_key}' does not exist. Skipping monster creation.")
                continue

            Monster.objects.get_or_create(
                name=monster_data['name'],
                description=monster_data['description'],
                theme=theme
            )
