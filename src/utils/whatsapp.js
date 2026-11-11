
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export function openWhatsApp(message) {
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

export function shareAssignment(assignment) {
  const message = `
School Homework Update

Class: ${assignment.className}
Subject: ${assignment.subject}

Assignment: ${assignment.title}

Description: ${assignment.description}

Teacher: ${assignment.teacher || "School Teacher"}

Due Date: ${assignment.dueDate}

Please complete your homework before the deadline.
`;

  openWhatsApp(message);
}
