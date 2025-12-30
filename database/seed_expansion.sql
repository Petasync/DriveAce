-- ============================================
-- ZUSÄTZLICHE FRAGEN - Expansion auf 150 Fragen
-- ============================================

-- Weitere VERKEHRSZEICHEN Fragen (51-60)
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(1, 'Was bedeutet ein rundes rotes Schild mit der Zahl 50?', 2, 'Zeichen 274: Zulässige Höchstgeschwindigkeit 50 km/h. Sie dürfen nicht schneller als 50 km/h fahren.', 'easy'),
(1, 'Sie sehen ein blaues rechteckiges Schild mit "P". Was bedeutet das?', 2, 'Zeichen 314: Parkplatz. Hier dürfen Sie parken.', 'easy'),
(1, 'Was bedeutet ein rundes blaues Schild mit Fußgänger-Symbol?', 2, 'Zeichen 239: Gehweg. Der Weg ist nur für Fußgänger bestimmt.', 'easy'),
(1, 'Ein dreieckiges Schild zeigt ein Auto auf welligen Linien. Was bedeutet das?', 3, 'Warnung vor Ufer/Schleudergefahr. Sie müssen Geschwindigkeit reduzieren und vorsichtig fahren.', 'medium'),
(1, 'Was bedeutet ein weißes Schild mit grünem Pfeil nach rechts?', 3, 'Grünpfeil: Sie dürfen nach Anhalten bei Rot nach rechts abbiegen, wenn Sie niemanden gefährden.', 'hard'),
(1, 'Ein gelbes Schild zeigt schwarze Kinder. Was bedeutet das?', 3, 'Zeichen 136: Kinder. Warnung vor spielenden Kindern, Geschwindigkeit reduzieren.', 'medium'),
(1, 'Was bedeutet ein rundes blaues Schild mit Auto und Motorrad nebeneinander?', 2, 'Kraftfahrstraße. Nur für Kraftfahrzeuge mit bauartbedingter Mindestgeschwindigkeit über 60 km/h.', 'medium'),
(1, 'Sie sehen ein Zusatzschild "Anlieger frei". Was bedeutet das?', 2, 'Nur Anlieger (Anwohner, Besucher, Lieferanten) dürfen die Straße benutzen.', 'easy'),
(1, 'Was bedeutet ein rundes rotes Schild mit weißem Strich?', 2, 'Zeichen 267: Verbot der Einfahrt. Sie dürfen nicht in diese Straße einfahren.', 'easy'),
(1, 'Ein weißes Schild mit schwarzem Auto und rotem Kreuz. Was bedeutet das?', 3, 'Verbot für Kraftwagen. PKW dürfen hier nicht fahren.', 'medium');

-- Antworten für Fragen 51-60
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(51, 'Höchstgeschwindigkeit 50 km/h', 1, 1),
(51, 'Mindestgeschwindigkeit 50 km/h', 0, 2),
(51, 'Empfohlene Geschwindigkeit 50 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(52, 'Parkplatz', 1, 1),
(52, 'Parken verboten', 0, 2),
(52, 'Haltestelle', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(53, 'Gehweg - nur für Fußgänger', 1, 1),
(53, 'Gemeinsamer Geh- und Radweg', 0, 2),
(53, 'Fußgängerzone', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(54, 'Warnung vor Ufer/Schleudergefahr', 1, 1),
(54, 'Warnung vor Wasser auf Fahrbahn', 0, 2),
(54, 'Fähre voraus', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(55, 'Nach Anhalten bei Rot nach rechts abbiegen erlaubt', 1, 1),
(55, 'Grünphase verlängert', 0, 2),
(55, 'Rechtsabbieger haben immer Vorfahrt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(56, 'Warnung vor spielenden Kindern', 1, 1),
(56, 'Spielstraße', 0, 2),
(56, 'Schule voraus', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(57, 'Kraftfahrstraße - Mindestgeschwindigkeit beachten', 1, 1),
(57, 'Autobahn', 0, 2),
(57, 'Überholverbot', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(58, 'Nur Anlieger dürfen die Straße benutzen', 1, 1),
(58, 'Anlieger haben Vorfahrt', 0, 2),
(58, 'Durchfahrt verboten', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(59, 'Verbot der Einfahrt', 1, 1),
(59, 'Durchfahrt verboten', 0, 2),
(59, 'Einbahnstraße', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(60, 'Verbot für Kraftwagen', 1, 1),
(60, 'Parkverbot für PKW', 0, 2),
(60, 'Einfahrt verboten', 0, 3);

-- Weitere VORFAHRT Fragen (61-70)
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(2, 'Sie fahren auf einer Vorfahrtsstraße. Ein Fahrzeug will von rechts einfahren. Wer hat Vorfahrt?', 4, 'Auf einer Vorfahrtsstraße (Zeichen 306) haben Sie Vorfahrt vor allen einfahrenden Fahrzeugen.', 'medium'),
(2, 'An einer Kreuzung blinkt gelbes Licht. Welche Regel gilt?', 3, 'Bei gelbem Blinklicht gelten die Verkehrsschilder. Ohne Schilder gilt "Rechts vor Links".', 'medium'),
(2, 'Sie wollen links abbiegen. Der Gegenverkehr fährt geradeaus. Wer darf zuerst fahren?', 4, 'Beim Linksabbiegen müssen Sie dem Gegenverkehr Vorfahrt gewähren.', 'medium'),
(2, 'Ein Bus verlässt eine Haltestelle mit Blinker. Was müssen Sie beachten?', 3, 'Innerorts müssen Sie dem Bus das Einfahren ermöglichen und ggf. warten oder die Geschwindigkeit reduzieren.', 'medium'),
(2, 'Sie nähern sich einem Zebrastreifen. Ein Fußgänger wartet am Rand. Was tun Sie?', 4, 'Sie müssen Fußgängern am Zebrastreifen stets Vorrang gewähren und ggf. anhalten.', 'medium'),
(2, 'Auf einem Parkplatz gibt es keine Markierungen. Welche Regel gilt?', 3, 'Auf Parkplätzen ohne Markierung gilt die Schrittgeschwindigkeit und besondere Vorsicht. "Rechts vor Links" gilt nur eingeschränkt.', 'hard'),
(2, 'Sie biegen rechts ab. Ein Radfahrer fährt geradeaus. Wer hat Vorrang?', 5, 'Beim Abbiegen müssen Sie allen geradeausfahrenden Radfahrern Vorrang gewähren.', 'hard'),
(2, 'Eine Straßenbahn will kreuzen. Was gilt?', 4, 'Straßenbahnen haben grundsätzlich Vorrang vor dem Autoverkehr, außer sie kommen von rechts.', 'medium'),
(2, 'Sie sehen ein abgeknicktes Vorfahrtsschild. Was bedeutet das?', 3, 'Die Vorfahrtsstraße macht einen Knick. Wer der abknickenden Vorfahrt folgt, hat weiter Vorfahrt.', 'medium'),
(2, 'Im Kreisverkehr ohne Schilder - welche Regel gilt?', 4, 'Ohne Schilder gilt "Rechts vor Links", d.h. einfahrende Fahrzeuge hätten Vorfahrt. Mit Schild 215 haben Fahrzeuge im Kreis Vorfahrt.', 'hard');

-- Antworten für Fragen 61-70
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(61, 'Ich habe Vorfahrt', 1, 1),
(61, 'Der Einfahrende hat Vorfahrt', 0, 2),
(61, 'Rechts vor Links', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(62, 'Verkehrsschilder beachten, sonst Rechts vor Links', 1, 1),
(62, 'Ampel ist außer Betrieb, freie Fahrt', 0, 2),
(62, 'Alle müssen anhalten', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(63, 'Gegenverkehr hat Vorfahrt', 1, 1),
(63, 'Ich habe Vorfahrt', 0, 2),
(63, 'Wer zuerst kommt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(64, 'Dem Bus das Einfahren ermöglichen', 1, 1),
(64, 'Ich habe Vorfahrt', 0, 2),
(64, 'Bus muss warten', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(65, 'Anhalten und Fußgänger queren lassen', 1, 1),
(65, 'Weiterfahren, Fußgänger wartet ja', 0, 2),
(65, 'Hupen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(66, 'Schrittgeschwindigkeit, besondere Vorsicht', 1, 1),
(66, 'Rechts vor Links streng', 0, 2),
(66, 'Freie Fahrt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(67, 'Radfahrer hat Vorrang', 1, 1),
(67, 'Ich habe Vorrang', 0, 2),
(67, 'Wer schneller ist', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(68, 'Straßenbahn hat Vorrang', 1, 1),
(68, 'Rechts vor Links', 0, 2),
(68, 'Ich habe Vorfahrt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(69, 'Vorfahrtsstraße knickt ab', 1, 1),
(69, 'Vorfahrt endet', 0, 2),
(69, 'Kreuzung voraus', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(70, 'Mit Schild 215: Fahrzeuge im Kreis haben Vorfahrt', 1, 1),
(70, 'Immer Rechts vor Links', 0, 2),
(70, 'Einfahrende haben Vorfahrt', 0, 3);

-- Weitere GESCHWINDIGKEIT Fragen (71-80)
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(3, 'Was ist die zulässige Höchstgeschwindigkeit innerorts für PKW?', 2, 'Innerorts gilt für alle Fahrzeuge eine Höchstgeschwindigkeit von 50 km/h, sofern nicht anders ausgeschildert.', 'easy'),
(3, 'Welche Geschwindigkeit gilt außerorts auf Landstraßen für PKW?', 2, 'Auf Landstraßen außerorts gilt für PKW 100 km/h, sofern nicht anders ausgeschildert.', 'easy'),
(3, 'Sie fahren mit Anhänger. Welche Geschwindigkeit gilt außerorts?', 3, 'Mit Anhänger gilt außerorts eine Höchstgeschwindigkeit von 80 km/h.', 'medium'),
(3, 'Bei Nebel mit Sichtweite unter 50m - welche Geschwindigkeit?', 4, 'Bei Sichtweite unter 50m durch Nebel, Schnee oder Regen dürfen Sie maximal 50 km/h fahren.', 'medium'),
(3, 'Was bedeutet Richtgeschwindigkeit auf Autobahnen?', 3, 'Die Richtgeschwindigkeit von 130 km/h ist eine Empfehlung, keine Pflicht. Höhere Geschwindigkeiten sind erlaubt, wo kein Tempolimit gilt.', 'medium'),
(3, 'Wann müssen Sie Ihre Geschwindigkeit anpassen?', 4, 'Bei schlechter Sicht, Nässe, Glätte, an Kreuzungen, Fußgängerüberwegen und grundsätzlich an die Verkehrslage.', 'medium'),
(3, 'Mit Winterreifen bei Schnee - gilt ein Tempolimit?', 3, 'Sie müssen die Geschwindigkeit den Witterungsverhältnissen anpassen. Die Angabe auf Winterreifen (z.B. "Q" = 160 km/h) darf nicht überschritten werden.', 'hard'),
(3, 'Sie fahren 20 km/h zu schnell innerorts. Was droht?', 3, 'Bußgeld ab 70€ und 1 Punkt in Flensburg. Ab 21 km/h zu schnell gibt es zusätzlich ein Fahrverbot.', 'medium'),
(3, 'Spielstraße - welche Geschwindigkeit?', 3, 'In verkehrsberuhigten Bereichen (Spielstraßen) gilt Schrittgeschwindigkeit (4-7 km/h).', 'medium'),
(3, 'Ab welcher Geschwindigkeitsüberschreitung gibt es ein Fahrverbot?', 4, 'Innerorts ab 31 km/h zu schnell, außerorts ab 41 km/h zu schnell droht ein Fahrverbot.', 'hard');

-- Antworten für Fragen 71-80
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(71, '50 km/h', 1, 1),
(71, '30 km/h', 0, 2),
(71, '60 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(72, '100 km/h', 1, 1),
(72, '120 km/h', 0, 2),
(72, '80 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(73, '80 km/h', 1, 1),
(73, '100 km/h', 0, 2),
(73, '60 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(74, 'Maximal 50 km/h', 1, 1),
(74, 'Maximal 80 km/h', 0, 2),
(74, 'Maximal 30 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(75, 'Empfehlung 130 km/h, höhere Geschwindigkeit erlaubt', 1, 1),
(75, 'Pflicht 130 km/h', 0, 2),
(75, 'Mindestgeschwindigkeit 130 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(76, 'An Sicht, Witterung, Verkehr und Straße', 1, 1),
(76, 'Nur bei Regen', 0, 2),
(76, 'Nur an Kreuzungen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(77, 'Ja, nach Witterung und Reifenangabe', 1, 1),
(77, 'Nein, Winterreifen erlauben jede Geschwindigkeit', 0, 2),
(77, 'Maximal 80 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(78, 'Bußgeld ab 70€ und 1 Punkt', 1, 1),
(78, 'Nur Verwarnung', 0, 2),
(78, 'Fahrverbot', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(79, 'Schrittgeschwindigkeit (4-7 km/h)', 1, 1),
(79, '30 km/h', 0, 2),
(79, '10 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(80, 'Innerorts ab 31 km/h, außerorts ab 41 km/h zu schnell', 1, 1),
(80, 'Ab 50 km/h zu schnell', 0, 2),
(80, 'Ab 20 km/h zu schnell', 0, 3);

-- Weitere ABSTAND & BREMSEN Fragen (81-90)
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(4, 'Welcher Sicherheitsabstand gilt innerorts als Faustregel?', 3, 'Innerorts gilt als Faustregel: 3 Fahrzeuglängen bzw. 15 Meter oder 1 Sekunde Zeitabstand.', 'medium'),
(4, 'Wie berechnen Sie den Bremsweg bei normaler Bremsung?', 4, '(Geschwindigkeit ÷ 10) × (Geschwindigkeit ÷ 10) = Bremsweg in Metern. Bei 50 km/h: 5 × 5 = 25m', 'medium'),
(4, 'Was ist der Anhalteweg?', 4, 'Anhalteweg = Reaktionsweg + Bremsweg. Die gesamte Strecke vom Erkennen der Gefahr bis zum Stillstand.', 'medium'),
(4, 'Bei doppelter Geschwindigkeit verlängert sich der Bremsweg um?', 5, 'Bei doppelter Geschwindigkeit vervierfacht sich der Bremsweg! Von 50 auf 100 km/h: Bremsweg von 25m auf 100m.', 'hard'),
(4, 'Welcher Abstand gilt auf Autobahnen?', 3, 'Halber Tachowert in Metern, z.B. bei 100 km/h = 50 Meter Abstand. Oder: 2 Sekunden Regel.', 'medium'),
(4, 'Sie fahren 50 km/h. Wie lang ist der Reaktionsweg?', 3, 'Reaktionsweg = (Geschwindigkeit ÷ 10) × 3. Bei 50 km/h: 5 × 3 = 15 Meter.', 'medium'),
(4, 'Wie bremsen Sie auf Glatteis richtig?', 4, 'Motor als Bremse nutzen, vorsichtig und gefühlvoll bremsen, ABS arbeiten lassen, nicht lenken während des Bremsens.', 'hard'),
(4, 'Wann ist der Bremsweg am längsten?', 4, 'Bei Nässe, Glätte, schlechten Reifen, bergab und hoher Geschwindigkeit.', 'medium'),
(4, 'Was ist die "1 Sekunde Regel"?', 3, 'Zeitabstand von mindestens 1 Sekunde zum Vordermann innerorts, 2 Sekunden außerorts.', 'medium'),
(4, 'Zu geringer Abstand - was droht?', 3, 'Bußgeld ab 25€, bei weniger als 3/10 des halben Tachowerts: bis zu 400€ und 2 Punkte plus Fahrverbot.', 'hard');

-- Antworten für Fragen 81-90
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(81, '3 Fahrzeuglängen bzw. 15 Meter', 1, 1),
(81, '1 Fahrzeuglänge', 0, 2),
(81, '50 Meter', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(82, '(Geschwindigkeit ÷ 10) × (Geschwindigkeit ÷ 10)', 1, 1),
(82, 'Geschwindigkeit ÷ 2', 0, 2),
(82, 'Geschwindigkeit × 2', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(83, 'Reaktionsweg + Bremsweg', 1, 1),
(83, 'Nur der Bremsweg', 0, 2),
(83, 'Doppelter Bremsweg', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(84, 'Der Bremsweg vervierfacht sich', 1, 1),
(84, 'Der Bremsweg verdoppelt sich', 0, 2),
(84, 'Der Bremsweg verdreifacht sich', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(85, 'Halber Tachowert in Metern', 1, 1),
(85, 'Ganzer Tachowert in Metern', 0, 2),
(85, '10 Meter', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(86, '(Geschwindigkeit ÷ 10) × 3 = 15m', 1, 1),
(86, '50 Meter', 0, 2),
(86, '5 Meter', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(87, 'Motor als Bremse, gefühlvoll bremsen, nicht lenken', 1, 1),
(87, 'Vollbremsung', 0, 2),
(87, 'Gar nicht bremsen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(88, 'Bei Nässe, Glätte, bergab, hoher Geschwindigkeit', 1, 1),
(88, 'Bei Trockenheit', 0, 2),
(88, 'Bei niedriger Geschwindigkeit', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(89, '1 Sekunde innerorts, 2 Sekunden außerorts', 1, 1),
(89, 'Immer 3 Sekunden', 0, 2),
(89, '0,5 Sekunden', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(90, 'Bis zu 400€, 2 Punkte und Fahrverbot möglich', 1, 1),
(90, 'Nur Verwarnung', 0, 2),
(90, 'Keine Strafe', 0, 3);

-- Weitere ÜBERHOLEN Fragen (91-100)
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(91, 'Mindestens um 20 km/h schneller und deutlich schnelleres Vorbeikommen', 1, 1),
(91, 'Beliebig', 0, 2),
(91, 'Genau 10 km/h schneller', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(92, 'Vor Kuppen, Kurven, Zebrastreifen, bei Gegenverkehr', 1, 1),
(92, 'Nur bei Gegenverkehr', 0, 2),
(92, 'Nie', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(93, 'Ja, mit ausreichend Abstand und ohne zu behindern', 1, 1),
(93, 'Nein, absolutes Verbot', 0, 2),
(93, 'Nur auf Autobahn', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(94, 'Erst nach kompletter Vorbeifahrt einordnen', 1, 1),
(94, 'Sofort einordnen', 0, 2),
(94, 'Nach 10 Metern', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(95, 'Nicht beschleunigen und Platz lassen', 1, 1),
(95, 'Beschleunigen', 0, 2),
(95, 'Bremsen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(96, 'Ab 70€ Bußgeld und 1 Punkt', 1, 1),
(96, 'Nur Verwarnung', 0, 2),
(96, 'Keine Strafe', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(97, 'Geschwindigkeit reduzieren und rechts halten', 1, 1),
(97, 'Beschleunigen', 0, 2),
(97, 'Stehenbleiben', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(98, 'Nein, nur rechts überholen erlaubt', 1, 1),
(98, 'Ja, immer', 0, 2),
(98, 'Nur bei Stau', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(99, 'Warten bis Gegenverkehr vorbei ist', 1, 1),
(99, 'Schnell durchfahren', 0, 2),
(99, 'Hupen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(100, 'Weiterhin Spur halten, nicht abbremsen oder beschleunigen', 1, 1),
(100, 'Beschleunigen', 0, 2),
(100, 'Stark bremsen', 0, 3);


INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(5, 'Wie viel schneller müssen Sie beim Überholen sein?', 3, 'Sie müssen deutlich schneller sein als der zu Überholende. Als Faustregel gelten mindestens 20 km/h Geschwindigkeitsdifferenz.', 'medium'),
(5, 'Wo ist das Überholen grundsätzlich verboten?', 4, 'Überholverbot gilt vor Kuppen, in unübersichtlichen Kurven, an Zebrastreifen, bei Gegenverkehr und wo es durch Schild verboten ist.', 'medium'),
(5, 'Dürfen Sie an einer Ampel rechts an wartenden Fahrzeugen vorbeifahren?', 3, 'Ja, Fahrzeuge die auf Ampeln warten dürfen rechts vorsichtig überholt werden, sofern genug Platz ist.', 'medium'),
(5, 'Nach dem Überholen - wann dürfen Sie wieder einscheren?', 4, 'Erst wenn Sie den Überholten im Rückspiegel komplett sehen können. Nicht zu früh einscheren!', 'medium'),
(5, 'Was müssen Sie beim Überho

ltwerden beachten?', 3, 'Nicht beschleunigen, rechts halten, ggf. Geschwindigkeit leicht reduzieren um Überholvorgang zu erleichtern.', 'medium'),
(5, 'Verbotswidriges Überholen - welche Strafe?', 3, 'Bußgeld ab 70€, 1 Punkt. Bei Gefährdung bis 300€, 2 Punkte und 1 Monat Fahrverbot.', 'hard'),
(5, 'Ein Fahrzeug vor Ihnen hat Blinker links gesetzt. Was tun?', 3, 'Geschwindigkeit reduzieren, rechts halten und Überholvorgang abwarten. Nicht überholen!', 'medium'),
(5, 'Darf man auf der Autobahn rechts überholen?', 4, 'Nein, auf Autobahnen ist rechts überholen grundsätzlich verboten. Ausnahme: Kolonnenverkehr bei Stau (Schrittgeschwindigkeit).', 'hard'),
(5, 'Sie wollen überholen, aber Gegenverkehr naht. Was tun?', 3, 'Überholvorgang abbrechen und warten bis Gegenverkehr vorbei ist. Nie bei Gegenverkehr überholen!', 'medium'),
(5, 'Sie werden überholt. Was müssen Sie tun?', 3, 'Weiterhin Spur halten, nicht beschleunigen, ggf. leicht abbremsen um Überholvorgang zu erleichtern.', 'medium');
