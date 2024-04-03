// Search function
function performSearch() {
  var query = document.getElementById("search-query").value;
  chrome.bookmarks.search(query, function (results) {
    // Remove results without parentId
    const filteredResults = results.filter((result) => {
      return results.some((r) => r.id !== result.parentId);
    });

    // Clear previous results
    var resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    // Display the first three results
    for (var i = 0; i < Math.min(16, filteredResults.length); i++) {
      (function () {
        var listItem = document.createElement("li");
        listItem.className = "py-2 flex justify-between items-center";

        var link = document.createElement("a");
        link.href = filteredResults[i].url;
        link.textContent = filteredResults[i].title;
        link.className = "text-blue-500 hover:underline";
        link.target = "_blank";
        listItem.appendChild(link);

        var currentResultId = filteredResults[i].id; // Capture the current ID

        // Create a delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.className =
          "ml-1 bg-red-500 hover:bg-red-700 py-1 px-2 text-white rounded text-sm";

        // Set the click event listener
        deleteBtn.onclick = (function (bookmarkId) {
          return function () {
            alert("Bookmark deleted! " + bookmarkId);
            chrome.bookmarks.remove(bookmarkId);
            performSearch();
          };
        })(currentResultId);

        listItem.appendChild(deleteBtn);

        resultsList.appendChild(listItem);

        if (i === 0) {
          link.focus();
        }
      })(); // This IIFE is to ensure `i` is correctly scoped for asynchronous callbacks.
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
