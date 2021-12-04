class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :likes, :user
end
