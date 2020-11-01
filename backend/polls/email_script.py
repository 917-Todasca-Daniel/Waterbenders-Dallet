import smtplib, ssl
import threading
import time
import datetime
from email.message import EmailMessage

from polls.models_functions import get_all_documents_as_json


def send_email_to(server, receiver_email, message):
    msg = EmailMessage()
    msg.set_content(message)
    msg['Subject'] = "Document Alert"
    msg['From'] = "waterbenders.no.reply@gmail.com"
    msg['To'] = receiver_email

    server.send_message(msg)


def parse_date(strdate):
    if "T" in strdate:
        arr = strdate.split("T")
        strdate = arr[0]
    arr = strdate.split("-")
    return (int(arr[0]), int(arr[1]), int(arr[2]))


def create_message(document_name, user_name, upload_date, expire_date, reminder_name):
    return """
    Hello, {}!

    This is an e-mail to remind you of a note you've set for the following document:
    Document name: {}
    Upload date: {}
    Expire date: {}

    Reminder note: {}

    This is an automatic message, please do not reply.
    """.format(user_name, document_name, upload_date, expire_date, reminder_name)


class ThreadTask(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

        port = 465
        context = ssl.create_default_context()

        self.server = smtplib.SMTP_SSL("smtp.gmail.com", port, context=context)
        self.sender_email = "waterbenders.no.reply@gmail.com"
        self.password = "waterbenders69"
        self.server.login(self.sender_email, self.password)

        self.sett = set()
        self.email_data = None

    def check_emails(self, server):
        if self.email_data != None:
            reminder_data = self.email_data
            for email in reminder_data:
                print('email')
                document_name = email["document_name"]
                user_name = email["user_email"]
                upload_date = email["upload_date"]
                expire_date = email["expire_date"]
                reminders = email["reminders"]
                print('---', document_name, user_name, upload_date, expire_date, reminders)

                for reminder in reminders:
                    reminder_date = reminder["date"]
                    reminder_name = reminder["name"]
                    reminder_id = reminder["id"]

                    if reminder_id in self.sett:
                        continue

                    if reminder_date <= datetime.datetime.now().date():
                        send_email_to(server, user_name,
                                      create_message(document_name, user_name, str(upload_date), str(expire_date), reminder_name))
                        self.sett.add(reminder_id)

    def run(self):
        while True:
            try:
                json_data = get_all_documents_as_json()
                print(json_data)
                time.sleep(20)

                self.email_data = json_data
                self.check_emails(self.server)
            except Exception as ex:
                print(str(ex))


class ScriptRunner:
    def __init__(self):
        self.thread = None

    def start_script(self):
        self.thread = ThreadTask()
        self.thread.start()

    def update_data(self, json_data):
        if (self.thread == None):
            return
        self.thread.email_data = json_data
