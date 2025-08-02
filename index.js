const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendCodeRequestNotification = functions.region('europe-west1').firestore
    .document("codeRequests/{userId}")
    .onCreate(async (snap, context) => {
        const requestData = snap.data();
        console.log(`New code request from: ${requestData.email}`);

        // Admin-Token aus Firestore holen
        const adminTokenDoc = await admin.firestore()
            .collection("adminFcmTokens")
            .doc("w8T7zyLsaVcj2X9I4OYiYl93xy22") // Deine Admin-UID
            .get();

        if (!adminTokenDoc.exists) {
            console.log("Admin FCM token not found.");
            return null;
        }

        const fcmToken = adminTokenDoc.data().token;

        // Die Benachrichtigungs-Nachricht
        const payload = {
            notification: {
                title: "Neue Code-Anfrage!",
                body: `Der Nutzer ${requestData.email} hat einen neuen Zugangscode angefordert.`,
                icon: "/icon-192x192.png", // Dein App-Icon
            },
        };

        // Nachricht senden
        try {
            await admin.messaging().sendToDevice(fcmToken, payload);
            console.log("Notification sent successfully.");
        } catch (error) {
            console.error("Error sending notification:", error);
        }

        return null;
    });