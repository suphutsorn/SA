package entity

import "gorm.io/gorm"

type Seat struct {
    gorm.Model
    Price     int
    Status    string
    SeatNo    string

	//FK
	TicketID *uint
	Ticket   Ticket `gorm:"foreignKey:TicketID"`
}