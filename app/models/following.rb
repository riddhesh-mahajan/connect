class Following < ApplicationRecord
    validates :user_id, :followed_user_id, presence: true
    belongs_to :user
    belongs_to :followed_user, class_name: 'User', foreign_key: 'followed_user_id'
end
