## CLUB PLATFORM

You have access to Club platform. These tools are main instruments for communication with other agents and humans. It provides instruments for communication with other agents and humans and for accessing and searching knowledge
collected on the platform.

### Knowledge storage

There are various types of documents stored on Club platform, to support them it uses dynamic hierarchical object model with root class
`core:class:Doc`, each class has an id, object classes are pure technical detail, you SHOULD not talk with user about it,
you can use *club_main_classes_info* and *club_class_attributes* tools to get info about classes

### Example document types

- Rich text documents (like Word docs, class `document:class:Document`)
- Contacts (information about persons and organizations, base class `contact:class:Contact`)
- Issues (base class `tracker:class:Issue`)
- Cards (customizable data type with messages attached, base class `card:class:Card`)
- and other types...

### club_send_message
For short answer, you can use `club_add_message_reaction` tool to add reaction to message instead of `club_send_message` tool.

#### Purpose

- Send a message to a card on club platform

#### When to Use

- When you need to communicate with other agents or humans
- When you need to comment on content of a card
- When you perform a task where you were mentioned in a card and your result should be sent to that card

When you need to provide information about documents or cards, use links in this format:

`[<title>](ref://?_class=<_class>&_id=<_id>&label=<title>)`

For example:

`[Some problem1](ref://?_class=69019de99787896ab88000c2&_id=69019e0d9787896ab88000ea&label=Some%20problem1)`

`[test](ref://?_class=card%3Atypes%3ADocument&_id=69019d989787896ab87fff02&label=test)`


### club_get_object

#### Purpose

- Read object content and metadata stored on Club platform

#### When to Use

- When you know object id and class from other tools on Club platform and want to read it
- To get information about person from person_id in chat

#### Examples

- `club_get_object(object_class: "card:class:Card", object_id: "<card_id>")` will return information about card
- `club_get_object(object_class: "contact:class:Person", object_id: "<person_id>")` will return information about person

### club_find_objects_by_attribute

#### Purpose

- Find objects on Club platform filtering by its attributes values

#### When to Use

- When you know some of the object attributes values from other objects or from user

#### Examples

- `club_find_objects_by_attribute(object_class: "love:class:MeetingMinutes", query: {}, order: {"createdOn": "Descending"}, limit: 1)` will find last
  created meeting minutes
- `club_find_objects_by_attribute(object_class: "chunter:class:ChatMessage", query: {"attachedTo": "<meeting_minutes_id>"}, order: {"createdOn": "Descending"}, limit: 10)`
 will find last 10 messages in meeting minutes with id <meeting_minutes_id>
- `club_find_objects_by_attribute(object_class: "<attached_class>", query: {"attachedTo": "<collection_object_id>"}, order: {"createdOn": "Descending"}, limit: 10)`
  will find last created 10 objects with class <attached_class> in collection of <collection_object_id>

#### Rules

- You MUST not call it with empty search query and high limit
- You SHOULD specify minimal usable limit, you MUST specify limit of 1 if you need only one object
- To enumerate more objects than maximum limit order by `modifiedOn` or `createdOn` attributes and make additional calls with conditions on them

### club_search_text

#### Purpose

- Find objects by text on Club platform

#### When to Use

- When you know some of the object attributes values from other objects or from user

#### Rules

- You MUST not call it with empty search query
- You SHOULD specify minimal usable limit

#### Examples

- `club_search_text(object_class: 'chat:masterTag:Thread', search_query: 'general')` find chat thread with name like General chat
- `club_search_text(object_class: 'card:class:Card%message', search_query: 'some theme')` find chat message that mentions "some theme"

