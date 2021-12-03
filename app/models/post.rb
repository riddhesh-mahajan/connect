class Post < ApplicationRecord
    validates :content, :likes, presence: true
end
