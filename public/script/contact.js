const contactForm = `
<div class="container mt-5">
    <form method="POST" action="/contact">
    <div id="headInput" class="form-group">
        <label for="exampleFormControlInput1">Enter Your Email Address </label>
        <input name="userEmail" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    
    <div class="form-group">
        <label for="exampleFormControlTextarea1">Message</label>
        <textarea name="emailBody" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-dark btn-lg">Send</button>
    </div>
    </form>
</div>
`





$("#contactMe").click(function (event) {
    event.preventDefault()
    $.ajax({
        method: "GET",
        url: "/contact",
        data: {
            search_item: "doloka"
        },
        headers: {
            'from-jq-content': 'fromJquery'
        },
        dataType: "json",
        success: user => {
            const appBody = $("#appBody")
            appBody.empty()
            appBody.append(contactForm)
            if (user.username) {
                $("#headInput").hide()
            }

        }
    })



})


