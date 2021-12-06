class Api::V1::PostController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :login_required

  def create
    @post = User.find_by(id: $userData["id"]).posts.new(post_params)
    @post.likes = 0

    if @post.save
        render json: @post, status: :created
    else
        render json: @post.errors, status: :unprocessable_entity
    end
  end

  def like
    @post = Post.find(params['post_id'])
    @post.likes = @post.likes + 1

    if @post.save
        render json: @post, status: :ok
    else
        render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  private
  def post_params
      params.permit(:content)
      end
end
