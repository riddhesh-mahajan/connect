class Following < ApplicationRecord
    validates :user_id, :followed_user_id, presence: true
end
