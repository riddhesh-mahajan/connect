Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      get '/user/login', to: 'user#login'
      post '/user/create', to: 'user#create'

      get '/feed', to: 'feed#feed'

      post '/post', to: 'post#create'
    end
  end
end
