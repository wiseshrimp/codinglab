import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pprint import pprint
import pygame
import pygame.freetype  # Import the freetype module.


scope = ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
SHEET_NAME = "coding_lab"

    # data = sheet.get_all_records()  # Get a list of all records
    # row = sheet.row_values(1)  # Get a specific row
    # col = sheet.col_values(1)  # Get a specific column
    # cell = sheet.cell(1,2).value  # Get the value of a specific cell

class Data:
    def __init__(self):
        self.open_sheet()
        self.get_records()

    def open_sheet(self):
        creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
        client = gspread.authorize(creds)
        self.sheet = client.open(SHEET_NAME).sheet1  # Open the spreadsheet

    def get_records(self):
        self.data = self.sheet.get_all_records()
    
    def records(self):
        return self.data

data = Data()

class Screen:
    def __init__(self):
        pygame.init()
        self.width = 800
        self.height = 600
        self.screen = screen = pygame.display.set_mode([self.width, self.height])
        pygame.font.init()
        self.defaultFont = pygame.freetype.Font('assets/Raleway-Medium.ttf', 30)
        self.running = True
        self.load_images()
        self.draw()
        self.screen = 1

    def load_images(self):
        self.logo = pygame.image.load('assets/logo.png')

    def draw(self):
        while self.running:
            # Did the user click the window close button?
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
            self.draw_background()
            self.draw_logo()
            self.draw_hours()
            pygame.display.update()

        pygame.quit()
    
    def draw_background(self):
        self.screen.fill((221, 221, 221))
    
    def draw_logo(self):
        if self.screen == 1:
            img_scale = (self.width / 3) / self.logo.get_width()
            scaled_img = pygame.transform.rotozoom(self.logo, 0, img_scale)
            center_x = (self.width - scaled_img.get_width()) / 2
            center_y = (self.height - scaled_img.get_height()) / 2
            self.screen.blit(scaled_img, (center_x, center_y))
        else:
            img_scale = (self.width / 3) / self.logo.get_width()
            scaled_img = pygame.transform.rotozoom(self.logo, 0, img_scale)
            center_x = (self.width - scaled_img.get_width()) / 2
            center_y = (self.height - scaled_img.get_height()) / 2
            self.scaled_img_btm = center_y
            self.screen.blit(scaled_img, (center_x, 0))
    
    def draw_hours(self):
        d = data.records()
        for mentor in d:
            name = mentor["Mentor"]
            hour = mentor["Time"]
            self.defaultFont.render_to(self.screen, (20, self.scaled_img_btm), name + hour, (0, 0, 0))

screen = Screen()
