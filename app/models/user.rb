class User < ApplicationRecord
    validates :first_name, :last_name, :email, :password, presence: true
    validates :email, uniqueness: true
    
    has_many :posts
    has_many :followings
end
