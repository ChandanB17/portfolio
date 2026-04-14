const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendContactMessage = async (data) => {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};