# raspberry_pi_car
Using a raspberry pi as a dash cam and CAM bus reader
## Project Status
Currently under development - like many of my projects. The current plan is to use Docker as the dev environment, testing out react-carplay and building custom overlay of OBDII inputs. 
Something like this:
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
