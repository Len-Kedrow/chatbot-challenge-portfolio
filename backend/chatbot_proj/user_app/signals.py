from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError  # Import from Mailchimp directly
from .models import User

@receiver(post_save, sender=User)
def subscribe_user_to_mailchimp(sender, instance, created, **kwargs):
    if created:
        mailchimp = Client()
        mailchimp.set_config({
            "api_key": settings.MAILCHIMP_API_KEY,
            "server": settings.MAILCHIMP_SERVER_PREFIX
        })

        member_info = {
            "email_address": instance.email,
            "status": "subscribed",
        }

        try:
            response = mailchimp.lists.add_list_member(settings.MAILCHIMP_AUDIENCE_ID, member_info)
            print(f"User {instance.email} subscribed successfully: {response}")
        except ApiClientError as error:
            print(f"An error occurred: {error.text}")
