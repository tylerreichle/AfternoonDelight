class Api::MessagesController < ApplicationController
  def index
    @messages = Chatroom.find_by_id(params[:chatID]).messages
  end

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id

    if @message.save
      render 'api/messages/show'
      # broadcast message after save to DB
      Pusher.trigger('chats', 'new-message', {
        message: @message.body
      })
    else
      render json: @message.errors.full_messages
    end
  end

  def destroy
  end

  private

  def message_params
    params.require(:message).permit(:body, :chatroom_id)
  end
end
