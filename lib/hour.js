export const EDITIONS = [
  { title: "The quiet hour", body: "Write something you would not say in a room with the lights on." },
  { title: "Inventory", body: "Name three things on your desk that are older than this year." },
  { title: "False start", body: "Begin a sentence you do not intend to finish. Leave it on the wall." },
  { title: "Weather report", body: "Not the sky. The room. How it feels from the chair." },
  { title: "Borrowed line", body: "A sentence you overheard and cannot return." },
  { title: "Small repair", body: "Something you fixed today that nobody asked you to fix." },
  { title: "The other window", body: "Describe a view that is not yours." },
  { title: "Unsent", body: "The first paragraph of a letter you will not mail." },
  { title: "Kitchen light", body: "What the late hour sounds like where you are." },
  { title: "Margin note", body: "A thought that belongs in the gutter of a book." },
  { title: "After the meeting", body: "The sentence you edited out of your mouth." },
  { title: "Field note", body: "One observation that would not survive a second draft." }
];

export function hourKey(d = new Date()) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const h = String(d.getUTCHours()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}`;
}

export function editionFor(key) {
  const n = [...key].reduce((a, c) => a + c.charCodeAt(0), 0);
  return EDITIONS[n % EDITIONS.length];
}

export function msToNextHour(d = new Date()) {
  const n = new Date(d);
  n.setUTCMinutes(0, 0, 0);
  n.setUTCHours(n.getUTCHours() + 1);
  return n.getTime() - d.getTime();
}
