# First sign-in without email

Edge function `fj-first-password` (verify_jwt off) lets someone on `public.accounts` who has no password yet choose one from the sign-in screen ("First time? Create your password"). It uses `public.fj_auth_status(email)`, which only the service role can call. Once a password exists the function refuses; changing it later happens in Settings → Account while signed in. To let someone start over, clear their password:

    update auth.users set encrypted_password = '' where lower(email) = 'name@example.com';
