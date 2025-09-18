// Classification Engine
function classifyItem(name, weight) {
  const lower = name.toLowerCase();

  // Keyword-based classification
  if (lower.includes("plastic")) return { type: "Plastic", recyclable: true };
  if (lower.includes("glass")) return { type: "Glass", recyclable: true };
  if (lower.includes("metal") || lower.includes("can") || lower.includes("pan")) return { type: "Metal", recyclable: true };
  if (lower.includes("wood") || lower.includes("plank")) return { type: "Wood", recyclable: false };

  // Fallback: weight-based rules
  if (weight < 2) return { type: "Plastic", recyclable: true };
  else if (weight >= 2 && weight <= 4.99) return { type: "Glass", recyclable: true };
  else if (weight >= 5 && weight <= 14.99) return { type: "Wood", recyclable: false };
  else return { type: "Metal", recyclable: true };
}

// Track items
const items = [];

document.getElementById("itemForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const weight = parseFloat(document.getElementById("itemWeight").value);

  const result = classifyItem(name, weight);

  // Add item to list
  items.push(result);

  // Show item in UI
  const li = document.createElement("li");
  li.textContent = `${name} -> ${result.type} | Recyclable: ${result.recyclable ? "Yes ✅" : "No ❌"}`;
  document.getElementById("resultList").appendChild(li);

  // Update summary
  const recyclableCount = items.filter(i => i.recyclable).length;
  const nonRecyclableCount = items.length - recyclableCount;
  document.getElementById("summary").textContent =
    `Summary: ${recyclableCount} recyclable, ${nonRecyclableCount} non-recyclable.`;

  // Clear form
  document.getElementById("itemForm").reset();
});
