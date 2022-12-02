export default function handler(req, res) {
  res.status(200).json([
    {
      ticket_id: 1,
      name: "Tiket Masuk Nusantara",
      type: "Dewasa",
      price: 25000,
      qty: 0,
    },
    {
      ticket_id: 1,
      name: "Tiket Masuk Nusantara",
      type: "Anak Anak",
      price: 25000,
      qty: 0,
    },
    {
      ticket_id: 1,
      name: "Tiket Masuk Mancan Negara",
      type: "Dewasa",
      price: 25000,
      qty: 0,
    },
    {
      ticket_id: 1,
      name: "Tiket Masuk Mancan Negara",
      type: "Anak Anak",
      price: 25000,
      qty: 0,
    },
  ]);
}
