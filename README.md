![Mahram Buddy — A prototype for documenting milk-kinship relationships](docs/banner.svg)

# Mahram Buddy

A React and TypeScript prototype exploring how milk-kinship records can be entered, reviewed, and browsed through a guided interface. Built with Vite, React Router, Tailwind CSS, shadcn/ui, and Framer Motion.

## What to explore

- A multi-step recording form for parents, nursing mothers, and children.
- Public lookup and detail-page flows.
- An administrative interface for reviewing people, records, and duplicates.
- Animated form transitions and reusable input components.

## Run locally

Use Node.js 22 LTS and npm.

```bash
git clone https://github.com/nidaamalia/mahram-buddy.git
cd mahram-buddy
npm ci
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run build
npm test
```

## Code tour

- [Catat.tsx](src/pages/Catat.tsx): guided record-entry flow.
- [Cek.tsx](src/pages/Cek.tsx): lookup interface.
- [admin pages](src/pages/admin): administration prototype.
- [adminMockData.ts](src/data/adminMockData.ts): sample administrative data.
- [App.tsx](src/App.tsx): route composition.

## Prototype boundaries

The recording flow currently simulates saving; a success message does not mean a record has been persisted. Admin screens are demonstrations, not a production access-control system. Existing example tests do not establish coverage of the domain logic.

Use synthetic data in demos. Fields model sensitive family information, including identifiers and birth dates; a real service would need consent, authenticated access, data minimisation, and protected storage. The UI is not an authoritative determination of religious or legal relationships.

## Next engineering milestones

Separate domain rules from presentation, test relationship edge cases with expert-reviewed examples, and implement persistence and authorisation before accepting real records.
