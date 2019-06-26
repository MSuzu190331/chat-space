# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

<<<<<<< HEAD
=======
<<<<<<< HEAD

## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|e_mail|string|null: false|

### Association
- has_many :groups through :user_groups
- has_many :messages
- has_many :user_groups


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|

### Association
- has_many :users through :user_groups
- has_many :users_groups


## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false|
|user_id|integer|null: false|
|created_at|integer|null: false|

### Association
- belongs_to :user


=======
>>>>>>> parent of 836e730... Append database design to README.md
>>>>>>> d81eeaedca3ed281cfb424ed6c1f76403ee8f30f
* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
