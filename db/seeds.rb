require 'faker'

USERS = 10

user_list = []

User.create!(
    name: 'Logan',
    email: 'logan@gmail.com',
    password: 'test',
  )

USERS.times do
  user_list << User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: 'test'
  )
end