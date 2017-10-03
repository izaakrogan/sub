defmodule Discuss.UserSocket do
  use Phoenix.Socket

  # 2 user_socket ROUTES THE SOCKET CONNECTION TO comments_channel
  channel "comments:*", Discuss.CommentsChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
