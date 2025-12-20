# Neon Insurance

This is a [Next.js](https://nextjs.org) project built for Neon Insurance.

## Getting Started

First, run the development server:

```bash
yarn dev
```

## Chatbot AI & Fallback Logic

The application features an AI-powered chatbot with a robust fallback mechanism for when the primary AI (OpenAI) is unavailable or disabled.

### Key Features
- **Synonym Mapping**: Understands insurance-specific synonyms (e.g., "crash" -> "claims").
- **Negation Detection**: Handles negative queries (e.g., "I don't want a quote") to avoid incorrect matches.
- **Weighted Scoring**: Prioritizes critical keywords like "emergency" or "claim".
- **Non-Restrictive Patterns**: Uses flexible regex patterns to handle natural, conversational phrasing.
- **Contextual Awareness**: Remembers recent conversation topics to provide relevant answers.

## Interactive Chatbot Tester

You can test the chatbot's fallback logic directly from the command line without running the full web application.

```bash
yarn tsx interactive-tester.ts
```

This tool allows you to:
- See real-time responses.
- View which category/intent was matched for each query.
- Test complex natural language phrasing.

## Database Seeding

The project supports targeted seeding, allowing you to seed specific models without affecting others.

### Seed All Models
To seed all models (default behavior):
```bash
yarn prisma db seed
```

### Seed a Specific Model
To seed only a specific model and clear its existing data:
```bash
yarn prisma db seed -- --model=<ModelName>
```

**Example:**
```bash
yarn prisma db seed -- --model=ChatbotKnowledge
```

**Available Models:**
`Story`, `Service`, `TeamMember`, `SiteConfig`, `BlogPost`, `Claim`, `Competitor`, `Faq`, `ChatbotKnowledge`, `PricingFactor`, `RiskZone`, `Subscriber`, `User`.

