import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ gameId }) => {
  const url = `${window.location.origin}/join/${gameId}`;

  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas value={url} size={256} />
      <p className="mt-4">Scan this QR code to join the game</p>
    </div>
  );
};

export default QRCodeComponent;
