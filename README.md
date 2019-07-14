# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|e_mail|string|null: false|

### Association
- has_many :groups, through :user_groups
- has_many :messages
- has_many :user_groups


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through :user_groups
- has_many :user_groups
- has_many :messages


## user_groupsテーブル

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
- belongs_to :group



* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ....
