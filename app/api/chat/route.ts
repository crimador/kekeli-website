import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ── Contexte de l'entreprise pour l'IA ────────────────────────────────────────
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de KEKELI GROUP SARL-U, un cabinet de conseil et de services basé à Lomé, au Togo.

INFORMATIONS SUR L'ENTREPRISE :
- Nom : KEKELI GROUP SARL-U
- Slogan : "Nous mettons la lumière sur vos entreprises"
- Signification : "Kekeli" signifie "lumière" en langue Éwé
- Création : 25 avril 2023
- Adresse : Route de TOGO 2000, Attiégou — Lomé, Togo
- Téléphone / WhatsApp : +228 92 68 11 00
- Email : kekeligroup4@gmail.com
- NIF : 1001854635
- RCCM : TG-LFW-01-2023-B13-01308
- Horaires : du lundi au vendredi, de 8h00 à 18h00

SERVICES PROPOSÉS :
1. Comptabilité — tenue de comptabilité, bilans, états financiers (normes SYSCOHADA révisé)
2. Fiscalité — déclarations fiscales, optimisation, assistance aux contrôles fiscaux
3. Marketing — stratégies marketing, réseaux sociaux, campagnes publicitaires
4. Communication — identité visuelle, création de contenu, relations publiques
5. Étude de marché — analyse concurrentielle, étude de la demande
6. Formations — formation professionnelle en gestion, comptabilité, outils numériques
7. Coaching — accompagnement individuel et collectif, leadership
8. Rédaction & Gestion de projet — plans d'affaires, dossiers de financement
9. Démarches administratives — création d'entreprise, RCCM, NIF, licences
10. Conceptions & Impressions — flyers, brochures, cartes de visite, kakémono
11. Solution IT — logiciels de gestion, sites web, applications mobiles

RÈGLES IMPORTANTES :
- Réponds UNIQUEMENT en français, de manière chaleureuse et professionnelle.
- Reste TOUJOURS dans le contexte de KEKELI GROUP et de ses services. Si on te pose une question hors sujet (ex: météo, politique, autre entreprise), recentre poliment vers les services de KEKELI GROUP.
- Sois concis : 2 à 4 phrases maximum par réponse, sauf si on demande des détails.
- Quand un visiteur montre un intérêt concret ou veut un devis, invite-le à contacter directement l'équipe via WhatsApp au +228 92 68 11 00 ou par email.
- Ne donne JAMAIS de prix exact (tu ne les connais pas), mais explique que KEKELI GROUP propose une première consultation GRATUITE pour établir un devis personnalisé.
- N'invente jamais d'informations. Si tu ne sais pas, propose de contacter l'équipe.`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuration de l'assistant manquante." },
        { status: 503 }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Format invalide.' }, { status: 400 });
    }

    // On limite l'historique aux 10 derniers messages pour rester léger
    const recent = messages.slice(-10);

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recent,
        ],
        temperature: 0.6,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erreur Groq:', errText);
      return NextResponse.json(
        { error: "L'assistant est temporairement indisponible." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Désolé, je n'ai pas pu répondre.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[CHAT_ERROR]', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue.' },
      { status: 500 }
    );
  }
}
