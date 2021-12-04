class Api::V1::FeedController < ApplicationController
  def feed
    # User.find_by(id: 1).posts.create(
    #   content: 'We are good',
    #   likes: 10,
    # ).save

    render json: Post.all, status: :ok
  end
end
