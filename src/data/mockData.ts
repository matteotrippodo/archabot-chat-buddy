import { Conversation } from "@/types/chat";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function msg(role: "user" | "assistant", content: string) {
  return { id: uid(), role, content, timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) };
}

export function createMockConversations(): Conversation[] {
  return [
    {
      id: uid(), title: "Benvenuto su Archabot", createdAt: "2025-02-15 10:00",
      messages: [
        msg("assistant", "Ciao! Sono Archabot, il tuo assistente AI. Come posso aiutarti oggi?"),
        msg("user", "Ciao! Puoi spiegarmi cosa sai fare?"),
        msg("assistant", "Certo! Posso aiutarti con molte cose:\n- Rispondere a domande\n- Analizzare immagini\n- Aiutarti con la programmazione\n- Creare contenuti\n- E molto altro!"),
      ],
    },
    {
      id: uid(), title: "Aiuto Python", createdAt: "2025-02-14 14:30",
      messages: [
        msg("user", "Ho bisogno di aiuto con Python"),
        msg("assistant", "Certo! Sono qui per aiutarti. Cosa ti serve per Python?"),
        msg("user", "Come posso leggere un file CSV?"),
        msg("assistant", "Puoi usare la libreria pandas:\n\n```python\nimport pandas as pd\ndf = pd.read_csv('file.csv')\nprint(df.head())\n```"),
      ],
    },
    {
      id: uid(), title: "Ricette Italiane", createdAt: "2025-02-13 09:15",
      messages: [
        msg("user", "Dammi una ricetta italiana semplice"),
        msg("assistant", "Ecco una ricetta per la pasta aglio e olio:\n\n🍝 **Ingredienti:**\n- 400g spaghetti\n- 4 spicchi d'aglio\n- 100ml olio extravergine\n- Peperoncino q.b.\n- Prezzemolo\n- Sale"),
        msg("user", "Perfetto, grazie!"),
        msg("assistant", "Prego! Buon appetito! 🍝"),
      ],
    },
    {
      id: uid(), title: "Configurazione API REST", createdAt: "2025-02-12 16:45",
      messages: [
        msg("assistant", "Benvenuto nella sezione configurazione API!"),
        msg("user", "Come posso creare una API REST con Flask?"),
        msg("assistant", "Ecco un esempio base:\n\n```python\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/api/data')\ndef get_data():\n    return jsonify({'message': 'Hello API'})\n```"),
      ],
    },
    {
      id: uid(), title: "Consigli di Viaggio", createdAt: "2025-02-11 11:00",
      messages: [
        msg("user", "Sto pianificando un viaggio in Italia"),
        msg("assistant", "Che bello! L'Italia è meravigliosa. Quali città vorresti visitare?"),
        msg("user", "Roma, Firenze e Venezia"),
        msg("assistant", "Ottima scelta!\n\n🏛️ **ROMA** (3-4 giorni):\n- Colosseo e Fori Romani\n- Vaticano e Cappella Sistina\n\n🎨 **FIRENZE** (2-3 giorni):\n- Galleria degli Uffizi\n- Duomo\n\n🚣 **VENEZIA** (2 giorni):\n- Piazza San Marco\n- Giro in gondola"),
      ],
    },
  ];
}

export const MOCK_USERS: Record<string, string> = { admin: "admin", user: "password" };

export function getMockResponse(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("ciao") || t.includes("salve")) return "Ciao! Come posso aiutarti oggi? 👋";
  if (t.includes("come stai")) return "Sto benissimo, grazie! Sono sempre pronto ad aiutarti. 😊";
  if (t.includes("python")) return "Python è un ottimo linguaggio! Posso aiutarti con codice, librerie, debugging e molto altro.";
  if (t.includes("grazie")) return "Prego! Sono qui per aiutarti. 😊";
  if (t.includes("aiuto") || t.includes("help")) return "Certo! Dimmi di cosa hai bisogno e farò del mio meglio per aiutarti.";
  return `Hai scritto: "${text}". Come posso aiutarti ulteriormente?`;
}
