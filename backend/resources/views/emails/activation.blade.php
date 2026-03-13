<!DOCTYPE html>
<html>
<head>
    <title>Activation de votre compte TakeIt</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
        .button { background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TakeIt</h1>
            <p>Plateforme de Gestion des Tâches</p>
        </div>

        <div class="content">
            <h2>Bonjour {{ $nom }},</h2>

            <p>Votre compte a été créé sur TakeIt. Voici vos identifiants de connexion :</p>

            <div class="credentials">
                <p><strong>📧 Email :</strong> {{ $email }}</p>
                <p><strong>🔑 Mot de passe temporaire :</strong> {{ $password_temp }}</p>
            </div>

            <p>Pour activer votre compte et définir votre mot de passe personnel, cliquez sur le bouton ci-dessous :</p>

            <a href="{{ $lien }}" class="button">Activer mon compte</a>

            <p style="margin-top: 30px; font-size: 0.9em; color: #999;">
                Ce lien expirera dans 24 heures. Si vous n'avez pas demandé ce compte, ignorez cet email.
            </p>
        </div>

        <div class="footer">
            <p>© {{ date('Y') }} TakeIt - Sopra HR. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
