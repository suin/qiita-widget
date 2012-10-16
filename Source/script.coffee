"use strict"

#
# Item entity class
#
class Item
	constructor: (item)->
		@title = item.title
		@url   = item.url
		@tags = []
		for tag in item.tags
			@tags.push name: tag.name, url: "http://qiita.com/tags/#{tag.name}"
		@user = new User(item.user)

#
# Item repository class
#
class ItemRepository
	itemContainer: {}
	constructor: ->
	findByUsername: (username, callback) ->
		if username of @itemContainer
			callback @itemContainer[username]
			return
		corsRequest "https://qiita.com/api/v1/users/#{username}/items?per_page=10", (rows) =>
			@itemContainer[username] = []
			for row in rows
				@itemContainer[username].push(new Item(row))
			callback(@itemContainer[username])

#
# User entity class
#
class User
	constructor: (user)->
		@name = user.url_name
		@profileImageUrl = user.profile_image_url
		@url = "http://qiita.com/users/#{@name}"

#
# Utilities
#
corsRequest = (url, callback) ->
	method = 'get'
	request = new XMLHttpRequest();
	if "withCredentials" of request
		request.open(method, url, true)
	else if typeof XDomainRequest != "undefined"
		request = new XDomainRequest()
		request.open(method, url)
	else
		throw "Failed to initialize CORSRequest"
	request.onload = =>
		result = JSON.parse(request.response)
		if request.status < 200 or 300 <= request.status
			throw result.error
		callback(result)
	request.send()

getElementsByClassName = (oElm, strTagName, strClassName) ->
	if strTagName == "*" and oElm.all
		arrElements = oElm.all
	else
		arrElements = oElm.getElementsByTagName(strTagName)

	arrReturnElements = []
	strClassName = strClassName.replace(/\-/g, "\\-")
	oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)")
	oElement

	for i in [0..arrElements.length]
		oElement = arrElements[i]
		if oElement and oRegExp.test(oElement.className)
			arrReturnElements.push(oElement)
	return arrReturnElements

addOnloadHandler = (newFunction) ->
	if  window.addEventListener # W3C standard
		window.addEventListener('load', newFunction, false) ## NB **not** 'onload'
	else if  window.attachEvent # Microsoft
		window.attachEvent('onload', newFunction)

setIframeHeight = (iframe) ->
	if (iframe)
		iframeWin = iframe.contentWindow or iframe.contentDocument.parentWindow
		if iframeWin.document.body
			iframe.height = iframeWin.document.documentElement.scrollHeight or iframeWin.document.body.scrollHeight

template = """
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<style type="text/css">
<!--%css%-->
</style>
</head>
<body>
<div class="bar">
	<a href="http://qiita.com" class="logo" target="_blank"></a>
	<a href="" class="user" id="user_url" target="_blank">
		<img class="avatar" src="#" id="user_avatar">
		<span class="username" id="user_name"></span>
	</a>
</div>
<div class="items" id="items"></div>
</body>
</html>
"""

#
# Main function
#
main = ->
	widgets = getElementsByClassName(document, 'a', 'qiita-timeline')

	addOnloadHandler ->
		for widget in widgets
			username = widget.getAttribute('data-qiita-username')

			iframe = document.createElement('iframe')
			iframe.style.display = 'none';
			iframe.setAttribute("frameBorder","0")
			iframe.style.width = '100%'
			widget.parentNode.appendChild(iframe)
			widget.style.display = 'none'
			doc = frames[frames.length - 1].document
			doc.open()
			doc.write(template)
			doc.close()

			doc.getElementById('user_name').innerHTML = username
			itemsBlock = doc.getElementById('items')

			# fetch data
			itemRepository = new ItemRepository()
			itemRepository.findByUsername username, (items) ->
				if items.length > 0
					doc.getElementById('user_avatar').setAttribute('src', items[0].user.profileImageUrl)
					doc.getElementById('user_url').setAttribute('href', items[0].user.url)

				for item in items
					itemElement = document.createElement('div')
					itemElement.setAttribute('class', 'item')
					title = document.createElement('a')
					title.innerText = item.title
					title.setAttribute('href', item.url)
					title.setAttribute('class', 'title')
					title.setAttribute('target', '_blank')
					itemElement.appendChild(title)

					for tag in item.tags
						tagElement = document.createElement('a')
						tagElement.innerText = tag.name
						tagElement.setAttribute('href', tag.url)
						tagElement.setAttribute('class', 'tag')
						tagElement.setAttribute('target', '_blank')
						itemElement.appendChild(tagElement)

					itemsBlock.appendChild(itemElement)

				# This should be final
				iframe.style.display = 'block'
				setIframeHeight iframe
main()