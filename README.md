# raspberry_pi_car
Using a raspberry pi as a dash cam and CAM bus reader
## How To Deploy This Yourself
```bash
npm create vite@latest pi-dashboard -- --template react-ts
cd pi-dashboard
npm install
npm install lucide-react
npm run dev
#You should now be able to reach localhost on whatever port Vite shows
#Gotta add steps for copying code in from GitHub
```

## Project Status
Currently under development - like many of my projects. Currently using react and Vite to build out a dashboard for diagnostics, testing out react-carplay and building custom overlay of OBDII inputs. 
The below diagram needs to be updated, sorry:
```text
┌─────────────────────────────────────────────┐
│           Docker (Mac Mini Dev)             │
│                                             │
│  ┌───────────┐  WebSocket  ┌──────────────┐ │
│  │  Python   │────────────▶│   Node.js    │ │
│  │  OBD2     │  (mock data │  Bridge/API  │ │
│  │  Collector│   in dev)   │              │ │
│  └───────────┘             └──────┬───────┘ │
│                                   │         │
│                            ┌──────▼───────┐ │
│                            │React-CarPlay │ │
│                            │  + OBD2      │ │
│                            │  Overlay UI  │ │
│                            └──────────────┘ │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│        Bare Metal (Pi 5 Production)         │
│                                             │
│  ┌───────────┐  WebSocket  ┌──────────────┐ │
│  │  Python   │────────────▶│   Node.js    │ │
│  │  OBD2     │  (real      │  Bridge/API  │ │
│  │  Collector│   serial)   │              │ │
│  └───────────┘             └──────┬───────┘ │
│                                   │         │
│                            ┌──────▼───────┐ │
│                            │React-CarPlay │ │
│                            │  + OBD2      │ │
│                            │  Overlay UI  │ │
│                            └──────────────┘ │
└─────────────────────────────────────────────┘
```
## Other notes
This project is teaching me the following:
- Node.js & TypeScript
- Python
- Soldering
- Electrical Engineering
- K-Line protocol
- Raspberry Pi OS
- Overall project experience and mimicing a dev -> prod flow
- Documentation and markdown syntax
- And overall just having fun!
## How to deploy
```bash
git clone $this repo because I dont want to copy and paste rn
cd pi-dashboard
npm run dev
```