class Post < ApplicationRecord
    validates :content, :likes, presence: true
    belongs_to :user
end
