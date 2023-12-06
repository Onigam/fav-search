// Search function
function performSearch() {
  var query = document.getElementById("search-query").value;
  chrome.bookmarks.search(query, function (results) {
    // Clear previous results
    var resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    // Display the first three results
    for (var i = 0; i < Math.min(6, results.length); i++) {
      var listItem = document.createElement("li");
      listItem.className = "py-2";

      var link = document.createElement("a");
      link.href = results[i].url;
      link.textContent = results[i].title;
      link.className = "text-blue-500 hover:underline";
      link.target = "_blank";
      listItem.appendChild(link);
      resultsList.appendChild(listItem);

      // Set focus to the first result
      if (i === 0) {
        link.focus();
      }
    }
  });
}

// Add event listener for the search button
document.getElementById("search-btn").addEventListener("click", performSearch);

// Add event listener for the Enter key within the input field
document
  .getElementById("search-query")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

// Automatically set focus to the search input when the popup is opened
document.getElementById("search-query").focus();
