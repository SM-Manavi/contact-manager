//Clone the hidden element and shows it
$(".add-one").click(function() {
  create();
});

function fill_mobile_fields(numArr) {
  if (numArr) {
    for (num of numArr) {
      create(num);
    }
  }
}

// fill_mobile_fields(numArr);

//Clone the hidden element and shows it
function create(val) {
  var num = $(".dynamic-element")
    .first()
    .clone();
  if (val) {
    num.children(".mymobile").val(val);
  }

  num.appendTo(".dynamic-stuff").show();
  attach_delete();
}

//Attach functionality to delete buttons
function attach_delete() {
  $(".delete").off();
  $(".delete").click(function() {
    console.log("click");
    $(this)
      .closest(".form-group")
      .remove();
  });
}

const searchBtn = document.getElementsByClassName("search")[0];

searchBtn.addEventListener("click", () => {
  const searchField = document.getElementsByClassName("searchVal")[0].value;
  fetch("./contacts/search?name=" + searchField)
    .then(res => {
      return res.json();
    })
    .then(data => {
      // document.getElementById("mylist").innerHTML = "";
      const list = document.getElementById("mylist");
      list.innerHTML = "";
      var htmlItem = createListItem(data);
      
      htmlItem.forEach(value => {
        console.log("2342324");
        list.append(value);
      });
    });
});

function createListItem(itemData) {
  if (itemData.contacts.length <= 0) {
    const h3 = document.createElement("h3");
    h3.innerText = itemData.mess;
    return [h3];
  } else {
    const item = document.getElementById("hiddenList").cloneNode(true);
    console.log(itemData.contacts);
    const items = [];
    for (findItem of itemData.contacts) {
      item.getElementsByClassName("card-title")[0].innerHTML = findItem.name;
      item.getElementsByClassName(
        "contactMobile"
      )[0].innerHTML = findItem.mobile.join(" | ");
      item.getElementsByClassName("contactEmail")[0].innerHTML = findItem.email;
      item.getElementsByClassName("contactEdit")[0].href =
        "/contacts/" + findItem.contactId + "/edit";
      item.getElementsByClassName("contactDelete")[0].href =
        "/contacts/" + findItem.contactId + "/delete";
      item.style.display = "block";
      const newItem = item.cloneNode(true);
      newItem.setAttribute('id', "");
      items.push(newItem);
    }
    return items;
  }
}
